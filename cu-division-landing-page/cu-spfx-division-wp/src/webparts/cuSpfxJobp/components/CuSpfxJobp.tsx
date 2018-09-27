import * as React from 'react';
import styles from './CuSpfxJobp.module.scss';

import {IJobInterface} from '../interfaces/iJobInterface';

import JobViewer from './JobViewer';

import './App.scss';

export interface ICuSpfxJobpProps {
  title: string;
  description: string;
  department: string | null;
  jobData: IJobInterface[];
}

export interface ICuSpfxJobpState {  
  error: {
    isErrored: boolean;
    errorMsg?: string;
  };
  isLoading: boolean;
}

export default class CuSpfxJobp extends React.Component<ICuSpfxJobpProps, ICuSpfxJobpState> {
  constructor(props: ICuSpfxJobpProps){
    super(props);
    this.state = {      
      error: {
        errorMsg: undefined,
        isErrored: false
      },
      isLoading: true
    };    
  }

  public componentDidMount():void{
    this.setState({isLoading: false});
  }

  public render(): JSX.Element {
    return(
      <div className='ms-Grid cuAppContainer' dir='ltr'>
        <div className='ms-Grid-row cuAppTitleRow'>
          <div className='ms-Grid-col ms-sm12'><h2>{this.props.title}</h2></div>
        </div>
        <div className='ms-Grid-row cuAppContentRow'>
          <div className='ms-Grid-col ms-sm12'>            
            {this.state.error.isErrored ? <div className='cuError'>{this.state.error.errorMsg}</div> : null}
            {this.state.isLoading ? <div className='cuLoading'>LOADING</div> : <JobViewer data={this.props.jobData} />}            
          </div>
        </div>
      </div>
    )   
  }
}

/* public render(): React.ReactElement<ICuSpfxJobpProps> {
  return (
    <div className={ styles.cuSpfxJobp }>
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
} */
