import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import {IJobInterface} from './interfaces/iJobInterface';

import CuSpfxJobp, {ICuSpfxJobpProps} from './components/CuSpfxJobp';

export interface ICuSpfxJobpWebPartProps {
  title: string;
  description: string;
  department: string | null;
  jobData: IJobInterface[]
}

export default class CuSpfxJobpWebPart extends BaseClientSideWebPart<ICuSpfxJobpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICuSpfxJobpProps > = React.createElement(
      CuSpfxJobp,
      {
        title: this.properties.title,
        description: this.properties.description,
        department: this.properties.department,
        jobData: this.properties.jobData        
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onInit():Promise<void>{
    return new Promise((res, rej) => {
      res(this.fetchData());
    });
  }

  protected fetchData():any{
    fetch('http://localhost:16121/jobs').then(
      result => {return result.json()}
    ).then(
      result => {
        console.clear();
        this.properties.jobData = result;
        console.log(this.properties);
      }
    ).catch(
      err => console.log(err)
    )
    
  } 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: `"${this.title}" Web Part Options`
          },
          groups: [
            {
              groupName: `Basic Info`,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: `Web Part Title`
                }),
                PropertyPaneTextField('description', {
                  label: `Web Part Description`
                }),
                PropertyPaneTextField('department', {
                  label: `Target Department`
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
