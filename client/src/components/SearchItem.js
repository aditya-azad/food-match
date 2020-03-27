import React, { Component } from 'react';
import styled from "styled-components";

class SearchItem extends Component {

  renderCategories() {
    let array = [];
    let restaurant = this.props.restaurant;
    for (let i = 0; i < restaurant.categories.length; i++) {
      array.push(
      <span key={i}>{restaurant.categories[i].title}</span>
      );
    }
    return(
      array
    )
  }

  render() {
    let restaurant = this.props.restaurant;
    return( 
      <Card>
        <div>
          <h2>{restaurant.name}</h2>  
          <p>{restaurant.location.address1}</p>
          <p>{restaurant.location.city}, {restaurant.location.state}</p>
          <p>{restaurant.display_phone}</p>
          {this.renderCategories()}
        </div>
          <Image src={restaurant.image_url} />
      </Card>
    ) 
  }
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  & img {
    height: auto;
    width: 50%;
  }
`
const Image = styled.div`
  background: url(${props => props.src});
  background-size: cover;
  width: 40%;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
`

export default SearchItem;

    /*
{
      "id": "0ER9-h1xmm5Pmrvs3jEMwQ",
      "alias": "starbucks-oakhurst",
      "name": "Starbucks",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Fofb71RBpf2NRXubkG44tA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/starbucks-oakhurst?adjust_creative=TvqwMEpXQRYuGyWA7VAkpg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TvqwMEpXQRYuGyWA7VAkpg",
      "review_count": 47,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "rating": 3,
      "coordinates": {
        "latitude": 37.333039,
        "longitude": -119.652481
      },
      "transactions": [],
      "price": "$",
      "location": {
        "address1": "40208 Highway 41 PO Box 3630",
        "address2": "",
        "address3": "",
        "city": "Oakhurst",
        "zip_code": "93644",
        "country": "US",
        "state": "CA",
        "display_address": [
          "40208 Highway 41 PO Box 3630",
          "Oakhurst, CA 93644"
        ]
      },
      "phone": "+15596588101",
      "display_phone": "(559) 658-8101",
      "distance": 31516.47631095062
    }
*/