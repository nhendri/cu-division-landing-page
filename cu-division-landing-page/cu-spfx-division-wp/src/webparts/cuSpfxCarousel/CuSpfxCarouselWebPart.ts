/* import 'core-js/es6/map';
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'whatwg-fetch'; */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CuSpfxCarouselWebPartStrings';
import CuSpfxCarousel, {ICuSpfxCarouselProps} from './components/CuSpfxCarousel';

export interface ICuSpfxCarouselWebPartProps {
  description: string;
  data: {};
}

export default class CuSpfxCarouselWebPart extends BaseClientSideWebPart<ICuSpfxCarouselWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICuSpfxCarouselProps > = React.createElement(
      CuSpfxCarousel,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getData():any{
    fetch('http://localhost:16121/jobs').then(
      result => {
        return result.json()
      }
    ).then(
      result => {
        console.clear();
        console.log(result);
        this.properties.data = result;
        console.log(this.properties);        
      }
    ).catch(
      err => console.log(err)
    )
  };

  protected onInit(): Promise<void>{
    return new Promise((res,rej) => {
      res(this.getData());
    });
  };

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
