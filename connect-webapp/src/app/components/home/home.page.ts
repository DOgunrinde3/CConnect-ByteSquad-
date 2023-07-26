import {Component, OnInit, ElementRef, ViewChild, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'intersection-observer';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, FooterPage],
})
export class HomePage implements OnInit {

  isStaff: boolean;

constructor(private router: Router,
              private elementRef: ElementRef,
            private authService: AuthService) {

  this.isStaff = this.authService.isStaff();
  }

  ngOnInit() {
    this.setupScrollTrigger();
  }



  setupScrollTrigger() {
    const welcomeSection = document.querySelectorAll('.welcome-content');
    const button = document.querySelectorAll('ion-button');
    const aboutSection = document.querySelectorAll('.about-section');
    const serviceSection = document.querySelectorAll('.description');
    const testimonialHeader = document.querySelectorAll('.testimonial-header');
    const testimonialSection1 = document.querySelectorAll('.testimonial-card1');
    const testimonialSection2 = document.querySelectorAll('.testimonial-card2');
    const testimonialSection3 = document.querySelectorAll('.testimonial-card3');
    const clinicSection = document.querySelectorAll('.clinic-subsection');
    const contactSection = document.querySelectorAll('.contactUs');

    const observer0 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation0');
        }
      });
    }, { threshold: 0.1 });

    for (let i = 0; i < button.length; i++) {
      const elements = button[i];
      observer0.observe(elements);
    }

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation1');
        }
      });
    }, { threshold: 0.1 });

    for (let i = 0; i < welcomeSection.length; i++) {
      const elements = welcomeSection[i];
      observer1.observe(elements);
    }

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation2');
        }
      });
    }, { threshold: 0.5 });

    for (let i = 0; i < aboutSection.length; i++) {
      const elements = aboutSection[i];
      observer2.observe(elements);
    }

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation3');
        }
      });
    }, { threshold: 0.8 });

    for (let i = 0; i < serviceSection.length; i++) {
      const elements = serviceSection[i];
      observer3.observe(elements);
    }

    const observer4 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation4');
        }
      });

    }, { threshold: 0.5 });

    for (let i = 0; i < testimonialSection1.length; i++) {
      const elements = testimonialSection1[i];
      observer4.observe(elements);
    }

    const observer5 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation5');
        }
      });

    }, { threshold: 0.55 });

    for (let i = 0; i < testimonialSection2.length; i++) {
      const elements = testimonialSection2[i];
      observer5.observe(elements);
    }

    const observer6 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation6');
        }
      });

    }, { threshold: 0.4 });

    for (let i = 0; i < testimonialSection3.length; i++) {
      const elements = testimonialSection3[i];
      observer6.observe(elements);
    }

    const observer7 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation7');
        }
      });

    }, { threshold: 0.5 });

    for (let i = 0; i < clinicSection.length; i++) {
      const elements = clinicSection[i];
      observer7.observe(elements);
    }

    const observer8 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation8');
        }
      });

    }, { threshold: 0.5 });

    for (let i = 0; i < contactSection.length; i++) {
      const elements = contactSection[i];
      observer8.observe(elements);
    }

    const observer9 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animation9');
        }
      });

    }, { threshold: 1 });

    for (let i = 0; i < testimonialHeader.length; i++) {
      const elements = testimonialHeader[i];
      observer9.observe(elements);
    }

  }


  onScroll(event: CustomEvent) {
    const scrollElement = event.target as HTMLElement;
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const clientHeight = scrollElement.clientHeight;

    // Check if the user has scrolled to the bottom of the page
    if (scrollHeight - scrollTop === clientHeight) {
      document.getElementById('scrollFooter').style.display = 'block';
    } else {
      document.getElementById('scrollFooter').style.display = 'none';
    }
  }

  routeToBook() {
    this.router.navigate(["/book"]);
  }

  routeToServices() {
    this.router.navigate(["/services"]);
  }
}
