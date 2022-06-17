import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";

// import custom Components
import Service from "./common/service";

import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'



class DealsBar extends Component {

    constructor() {
        super();
        this.state = {
            open:false,
            nav1: null,
            nav2: null
        };
    }

    // document.getElementById('idOfElement').classList.add('newClassName');


    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }
    
    filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }
    backClick() {
        document.getElementById("filter").style.left = "-365px";
    }

    render(){
        const {symbol, item, addToCart, addToCartUnsafe, addToWishlist} = this.props
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide:true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>Makki Herbals | Deals | {item.name}</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                {/* <Breadcrumb  parent={'Product'} title={item.name} /> */}

                {/*Section Start*/}
                {(item)?
                <section class="section-b-space">
                    <div class="collection-wrapper">
                        <div class="container">
                            <div class="row">

                                <div class="col-sm-3 collection-filter" id="filter">
                                    <div  class="collection-mobile-back pl-5">
                                        <span onClick={this.backClick}  class="filter-back">
                                            <i class="fa fa-angle-left" aria-hidden="true"></i> back
                                        </span>
                                    </div>

                                    {/* <BrandBlock/> */}
                                    <Service/>
                                    {/*side-bar single product slider start*/}
                               
                                    {/*side-bar single product slider end*/}
                                </div>
                                <div class="col-lg-9 col-sm-12 col-xs-12">
                                    <div class="">
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <div class="filter-main-btn mb-2">
                                                    <span onClick={this.filterClick}  class="filter-btn" >
                                                        <i class="fa fa-filter" aria-hidden="true"></i> filter</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 product-thumbnail">
                                                <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} class="product-slick">
                                                    {item.variants?
                                                    item.variants.map((vari, index) =>
                                                       <div key={index}>
                                                           <ImageZoom image={vari.images} />
                                                       </div>
                                                    ):
                                                    item.pictures.map((vari, index) =>
                                                        <div key={index}>
                                                            <ImageZoom image={vari} />
                                                        </div>
                                                    )}
                                                </Slider>
                                                <SmallImages item={item} settings={productsnav} navOne={this.state.nav1} />
                                            </div>
                                            <DetailsWithPrice symbol={symbol} item={item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                                        </div>
                                    </div>
                                    <DetailsTopTabs item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : ''}
                {/*Section End*/}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id;
    return {
        item: state.data.deals.find(el => el.name === productId),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, {addToCart, addToCartUnsafe, addToWishlist}) (DealsBar);