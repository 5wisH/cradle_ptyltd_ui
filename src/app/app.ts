import {
  Component,
  signal,
  computed,
  AfterViewInit,
  ElementRef,
  inject,
} from '@angular/core';

interface Service {
  index: string;
  title: string;
  blurb: string;
  points: string[];
}

interface Project {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  link?: string;
  placeholder?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private host = inject(ElementRef<HTMLElement>);

  readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);

  // ---- Contact form state ----
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  // Replace with your real business inbox before going live.
  protected readonly contactEmail = 'hello@cradle.co.za';

  protected readonly mailto = computed(() => {
    const subject = encodeURIComponent(`Project enquiry — ${this.name() || 'New visitor'}`);
    const body = encodeURIComponent(
      `Name: ${this.name()}\nEmail: ${this.email()}\n\n${this.message()}`
    );
    return `mailto:${this.contactEmail}?subject=${subject}&body=${body}`;
  });

  readonly nav = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  // ---- Services (from the CIPC annexure: scope of business) ----
  readonly services: Service[] = [
    {
      index: '01',
      title: 'Web Development',
      blurb: 'Responsive, scalable platforms from first wireframe to production.',
      points: [
        'Web apps & platforms in modern JS frameworks',
        'API design, backend architecture & integration',
        'E-commerce, CMS & digital portals',
        'UI/UX design, prototyping & user research',
      ],
    },
    {
      index: '02',
      title: 'Cloud Engineering',
      blurb: 'Cloud-native systems that scale with you and stay affordable.',
      points: [
        'Cloud-native architecture on AWS, Azure & GCP',
        'Legacy migration to the cloud',
        'DevOps, CI/CD automation & containerisation',
        'Serverless, microservices & cost governance',
      ],
    },
    {
      index: '03',
      title: 'Hardware & Infrastructure',
      blurb: 'The physical and hybrid backbone behind dependable systems.',
      points: [
        'Server & network hardware supply and config',
        'On-premise & hybrid infrastructure design',
        'Networking: LAN, WAN & VPN',
        'Disaster recovery & business continuity',
      ],
    },
    {
      index: '04',
      title: 'Mobile Development',
      blurb: 'Native and cross-platform apps people actually keep installed.',
      points: [
        'iOS & Android, native and cross-platform',
        'React Native, Flutter & PWAs',
        'Platform-aligned UI/UX',
        'App store deployment & API integrations',
      ],
    },
  ];

  // ---- Selected work. Edit freely; the last card is an open invitation. ----
  readonly projects: Project[] = [
    {
      name: 'Chauke MB Attorneys',
      kind: 'Law firm website & client portal',
      description:
        'A professional presence and enquiry platform for a legal practice, containerised and shipped to production.',
      stack: ['ASP.NET Core', 'C#', 'Docker', 'Render'],
    },
    {
      name: 'JUBEECKE (Pty) Ltd',
      kind: 'Marketing website',
      description:
        'A clean, fast marketing site that gives a growing company a credible online identity.',
      stack: ['Angular', 'TypeScript', 'SCSS'],
    },
    {
      name: 'Commerce platform',
      kind: 'Full-stack e-commerce',
      description:
        'An end-to-end store with authentication, catalogue and checkout flows across a decoupled frontend and API.',
      stack: ['Angular', 'Spring Boot', 'MySQL', 'JWT'],
    },
    {
      name: 'Your project',
      kind: 'Let’s build the next one',
      description:
        'Have something in mind? Tell us what you’re building and we’ll map the fastest route to a working version.',
      stack: [],
      placeholder: true,
    },
  ];

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }

  ngAfterViewInit(): void {
    const els = this.host.nativeElement.querySelectorAll('[data-reveal]');
    const revealAll = () =>
      els.forEach((el: Element) => el.classList.add('is-visible'));

    // No JS animation environment? Leave everything visible (the default).
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    try {
      // Switch on the hide-then-reveal animation.
      this.host.nativeElement.classList.add('reveal-enabled');

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12 }
      );
      els.forEach((el: Element) => io.observe(el));

      // Safety net: if anything stops the observer from firing,
      // reveal everything so the page can never stay blank.
      setTimeout(revealAll, 1500);
    } catch {
      this.host.nativeElement.classList.remove('reveal-enabled');
      revealAll();
    }
  }
}