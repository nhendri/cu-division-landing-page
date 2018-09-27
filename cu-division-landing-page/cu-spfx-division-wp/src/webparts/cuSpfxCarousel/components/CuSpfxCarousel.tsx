import * as React from 'react';
import styles from './CuSpfxCarousel.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ICuSpfxCarouselProps {
  description: string;
}

export default class CuSpfxCarousel extends React.Component<ICuSpfxCarouselProps, {}> {
  public render(): React.ReactElement<ICuSpfxCarouselProps> {
    return (
      <div className={ styles.cuSpfxCarousel }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
