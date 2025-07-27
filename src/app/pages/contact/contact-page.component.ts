import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {


  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    this.title.setTitle('Contact Page')
    this.meta.updateTag(
      { name: 'description', content: 'This is the contact page' }
    )

  }
}
