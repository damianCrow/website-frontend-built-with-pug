import { TweenLite, TimelineMax } from 'gsap'
import BezierEasing from 'bezier-easing'
import _isElement from 'lodash/isElement'

const fastOutSlowIn = [0.4, 0, 0.2, 1]

export default class Team {
  constructor(scrollToSection, lockBody) {
    this.body = document.getElementsByTagName('body')[0]
    this.container = document.getElementById('our-team')

    this.assignSubjects()
    this.buildAnimations()
    this.subjectSelect()

    this.lockHintTimeout = 0
    this.closeMessageTimeout

    this.closeHintAni = new TimelineMax()
    this.openSubjectAni = new TimelineMax()

    this.scrollToSection = scrollToSection
    this.lockBody = lockBody
  }

  assignSubjects() {
    this.subjects = document.getElementsByClassName('our-team__subject')
    this.openSubject = document.getElementsByClassName('our-team__subject--open')[0]
    this.container = document.getElementsByClassName('our-team')[0]
  }

  sizes() {
    const containerSizes = this.container.getBoundingClientRect()

    this.subjectSize = this.subjects[0].getBoundingClientRect()

    const remainingSpace = containerSizes.width - this.subjectSize.width
    const closedSize = remainingSpace / 3

    //  They each need to be closedSize in width.
    const closedHideBy = this.subjectSize.width - closedSize
    this.openSubject.style.zIndex = 3
    this.subjectAlignments = []

    let i = 0

    for (i = 0; i < this.subjects.length; i += 1) {
      this.subjects[i].dataset.subNum = i
      this.subjects[i].style.zIndex = i

      this.subjectAlignments.push({
        subject: this.subjects[i],
        id: i,
        openLeft: (() => {
          if (i === 0) {
            return (0 - closedHideBy)
          }
          return (0 - (closedHideBy * (i * 2)))
        })(),
        openRight: (0 - ((closedHideBy * i) - (this.subjectSize.width / this.subjects.length))),
      })
    }
  }

  subjectSelect() {
    let i = 0

    for (i = 0; i < this.subjects.length; i += 1) {
      // this.subjects[i].removeEventListener('click', (e) => this.openSub(e.target))
      this.subjects[i].addEventListener('click', (e) => this.selectedHandler(e.currentTarget))
      this.subjects[i]
        .getElementsByClassName('our-team__close-btn')[0]
        .addEventListener('click', (e) => this.closeSub(e.currentTarget.parentNode, e))
    }

    document.onkeydown = (evt) => {
      const event = evt || window.event
      if (event.keyCode === 27) {
        this.closeSub(null, evt)
      }
    }
  }

  selectedHandler(subjectSelected) {
    this.assignSubjects()

    const { openSubject, container } = this

    if (subjectSelected !== openSubject) {
      if (openSubject) {
        this.closeSub(openSubject)
      }

      this.scrollToSection(subjectSelected).then(() => {
        this.lockBody(true)
        this.subjectAnimations[subjectSelected.dataset.instance].play()
        subjectSelected.classList.add('our-team__subject--open')
        container.classList.add('our-team--open-subject')
      })
    }
  }

  buildAnimations() {
    const { subjects } = this
    this.subjectAnimations = []
    const bemClass = 'our-team__'

    Array.from(subjects).forEach((subject, index) => {
      const introText = subject.getElementsByClassName(`${bemClass}subject-intro-container`)[0]
      const introTitle = subject.getElementsByClassName(`${bemClass}subject-title`)[0]
      const featureImage = subject.getElementsByClassName(`${bemClass}feature-image`)[0]
      const subjectIntro = subject.getElementsByClassName(`${bemClass}subject-intro`)[0]
      const socialIcons = subject.getElementsByClassName(`${bemClass}social-icons`)[0]

      const openSub = new TimelineMax({ paused: true })
      subject.dataset.instance = index

      const defaultProps = {
        transition: 'none',
        ease: new Ease(BezierEasing(...fastOutSlowIn)),
      }

      openSub
        .to(introText, 0.35, { ...defaultProps, opacity: 0, scale: 0.8 })
        .to(subjectIntro, 0.85, { ...defaultProps, y: '-50%' }, '0.35')
        .to(featureImage, 0.85, { ...defaultProps, y: '25%' }, '0.35')
        .set(introText, { ...defaultProps, transform: 'translateY(22.5vh)', transformOrigin: 'center top' })
        .set(introTitle, { className: '+=our-team__subject-title--bigger' })
        .to(introText, 0.35, { ...defaultProps, opacity: 1, scale: 1 })

      if (_isElement(socialIcons)) {
        openSub
          .to(socialIcons, 0.25, { ...defaultProps, opacity: 1, scale: 1 }, '0.85')
          .set(socialIcons, { className: `-=${bemClass}social-icons--hidden` })
      }

      this.subjectAnimations.push(openSub)
    })
  }

  openSubCalculated(subjectToOpen) {
    const { subjectAlignments } = this
    const subjectToOpenId = subjectToOpen.dataset.subNum

    subjectAlignments.forEach((subject, index) => {
      if (subject.id.toString() !== subjectToOpenId) {
        if (index >= subjectToOpenId) {
          TweenLite.to(subject.subject, 1, { x: subject.openRight })
        } else {
          TweenLite.to(subject.subject, 1, { x: subject.openLeft })
        }
      }
    })
  }

  closeSub(sub, event) {
    if (event) {
      event.stopPropagation()
      this.lockBody(false)
    }

    this.assignSubjects()

    const subToClose = sub ? sub : this.openSubject

    if (subToClose) {
      TweenLite.to(subToClose, 0.5, { scrollTo: 0 })
      this.subjectAnimations[subToClose.dataset.instance].reverse()

      // console.log('subToClose.classList', subToClose.classList)
      subToClose.classList.remove('our-team__subject--open')
      this.container.classList.remove('our-team--open-subject')
      this.assignSubjects()
    }
  }

  lockedBodyHint(wheelTarget) {
    // TODO: This is ridiculous.
    // console.log('wheelTarget', wheelTarget)
    // console.log('this.openSubject', this.openSubject)

    if (_isElement(this.openSubject)) {
      if (!wheelTarget.closest('.our-team__subject--open')) {
        if (this.body.classList.contains('lock')) {
          // console.log('here?')
          this.assignSubjects()

          const { openSubject } = this

          if (openSubject) {
            const currentCloseBtn = openSubject.getElementsByClassName('close-button')[0]
            const currentTime = new Date().getTime()

            if (currentTime > this.lockHintTimeout) {
              clearTimeout(this.closeMessageTimeout)
              this.lockHintTimeout = currentTime + 5500
              currentCloseBtn.classList.add('close-button--active-message')
              this.closeMessageTimeout = setTimeout(() => {
                currentCloseBtn.classList.remove('close-button--active-message')
              }, 6000)
            }
          }
        }
      }
    }
  }
}
