import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GoogleAnalyticsService, NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { HighlightTag } from 'angular-text-input-highlight';
import { Dictionary, groupBy, uniqBy } from 'lodash';
import { HighlightResponse, HighlightType } from './highlight-response.interface';
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

  constructor(private highlightService: HighlightService, private $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  async addTags() {
    let tags: HighlightTag[] = []
    let highlights: HighlightResponse[] = await this.highlightService.getHighlights(this.text).toPromise()

    let groupedHighlights: Dictionary<HighlightResponse[]> =
      groupBy(highlights, (highlight) => highlight.type)

    this.generateTags(groupedHighlights, tags, HighlightType.ACTION, 'bg-blue')
    this.generateTags(groupedHighlights, tags, HighlightType.CUSTOMCHARACTERISTIC, 'bg-pink')
    this.generateTags(groupedHighlights, tags, HighlightType.DATABASE, 'bg-green')
    this.generateTags(groupedHighlights, tags, HighlightType.VALUE, 'bg-grey')
    this.generateTags(groupedHighlights, tags, HighlightType.CONDITION, 'bg-red')

    this.tags = tags    
  }

  private generateTags(groupedHighlights: Dictionary<HighlightResponse[]>, tags: HighlightTag[], type: HighlightType, cssClass: string): void {
    if (groupedHighlights[type]) {
      uniqBy(groupedHighlights[type], (highlight) => highlight.word)
        .filter((highlight) => highlight.word != '')
        .forEach((highlight) => {
          Array.from(this.text.matchAll(new RegExp(highlight.word, 'g')))
            .map(match => match.index as number)
            .forEach(index => {
              tags.push({
                indices: {
                  start: index,
                  end: index + highlight.word.length
                },
                cssClass: cssClass,
                data: highlight.word
              });
              this.$gaService.event('highlighted-Tags', highlight.word);
            })
        })
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
