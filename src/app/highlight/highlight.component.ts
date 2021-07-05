import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HighlightTag } from 'angular-text-input-highlight';
import { groupBy, uniqBy } from 'lodash';
import { HighlightResponse } from './highlight-response.interface';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HighlightComponent implements OnInit {

  text: string = '';
  tags: HighlightTag[] = [];
  tagClicked: HighlightTag | undefined;

  constructor(private highlightService: HighlightService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.addTags();
  }

  async addTags() {

    if (this.text[this.text.length - 1] === " ") {
      let tags: HighlightTag[] = []
      let highlights: HighlightResponse[] = await this.highlightService.getHighlights(this.text).toPromise()

      let groupedHighlights =
        groupBy(highlights, (highlight) => highlight.type)

      if (groupedHighlights.PRODUCT) {
        uniqBy(groupedHighlights.PRODUCT, (highlight) => highlight.word)
          .forEach((highlight) => {
            Array.from(this.text.matchAll(new RegExp(highlight.word, 'g')))
              .map(match => match.index as number)
              .forEach(index => {
                tags.push({
                  indices: {
                    start: index,
                    end: index + highlight.word.length
                  },
                  data: highlight.word
                });
              })
          })
      }

      if (groupedHighlights.ITEM) {
        uniqBy(groupedHighlights.ITEM, (highlight) => highlight.word)
          .forEach((highlight) => {

            Array.from(this.text.matchAll(new RegExp(highlight.word, 'g')))
              .map(match => match.index as number)
              .forEach(index => {
                tags.push({
                  indices: {
                    start: index,
                    end: index + highlight.word.length
                  },
                  cssClass: 'bg-pink',
                  data: highlight.word
                });
              })
          })
      }

      this.tags = tags
      this.cdr.detectChanges()
    }
  }

  addDarkClass(elm: HTMLElement) {
    if (elm.classList.contains('bg-blue')) {
      elm.classList.add('bg-blue-dark');
    } else if (elm.classList.contains('bg-pink')) {
      elm.classList.add('bg-pink-dark');
    }
  }

  removeDarkClass(elm: HTMLElement) {
    elm.classList.remove('bg-blue-dark');
    elm.classList.remove('bg-pink-dark');
  }

}
