import React, { Component, useState } from 'react';
import {CarouselCaption,CarouselItem,CarouselControl,CarouselIndicators,Carousel} from 'reactstrap';
import './NewsCards.css';
class News extends Component{
  constructor(props) {
		super(props);
		this.state = { 
    activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}
	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.props.data.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.props.data.items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}
  

render(){
  const { activeIndex } = this.state;
  console.log(this.props.data)
  const newsRenderer=this.props.data.map((newsElem)=>{
    // return(
    //   <Carousel fade>
    //   <CarouselItem>
    //     <img
    //       className="d-block w-100"
    //       src="holder.js/800x400?text=First slide&bg=373940"
    //       alt="First slide"
    //     />
    //     <CarouselCaption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </CarouselCaption>
    //   </CarouselItem>
    //   </Carousel>
    // );
    return (
      <CarouselItem
        style={{ flex: 1 }}
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={newsElem.source.name}
      >
        <img src={newsElem.urlToImage} alt={newsElem.title} className="newsImage"/>
        <CarouselCaption captionText={newsElem.title} captionHeader={newsElem.description} />
      </CarouselItem>
    );
  });  

  return (
    <div >
      <link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
				/>
      {this.props.error?(<div>{this.props.error}</div>):((this.props.data.length!==0 && this.props.data!==undefined)?(
        <Carousel
        className="container"
        activeIndex={activeIndex}
        interval={5000}
        slide={true}
        next={this.next}
        previous={this.previous}
        fade >
        <CarouselIndicators items={this.props.data} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {newsRenderer}
        <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
        <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
        </Carousel>
      ):(<div>Loading...</div>))}
    </div>
      );
}

};
export default News;