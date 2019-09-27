import React from 'react';
import Layout from '../components/Layout';
import '../styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = "3983ff28-e580-4b8b-9ad6-2a69d855afa8";

export default class CatList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      categories: [],
      itsAnArray: false
    };
  }

  componentDidMount() {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=100&page=4&order=Desc')
      .then(res => {
        let cats = [];
        const itsAnArray = Array.isArray(res.data);
        if (itsAnArray) {
          cats = res.data;
        } else {
          cats.push(res.data);
        }
        this.setState({ cats })
      })
    axios.get('https://api.thecatapi.com/v1/categories')
      .then(res => {
        let categories = [];
        const itsAnArray = Array.isArray(res.data);
        if (itsAnArray) {
          categories = res.data;
        } else {
          categories.push(res.data);
        }
        this.setState({ categories })
      })
  }

  onChange(cat) {
    axios.post('https://api.thecatapi.com/v1/favourites', { "image_id": cat, "sub_id": "memh0x" })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("You favorited a cat!");
      })
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd);
          alert("An error occured.");
        }
      });
  };

  filterFn = () => {
    let queryString = "limit=100&page=1&order=Desc"
    var e = document.getElementById("ddlCategory");
    if (e.options[e.selectedIndex].value != 'All') {
      queryString += "&category_ids=" + e.options[e.selectedIndex].value;
    }
    var items = document.getElementsByName('cbx');
    var selectedItems = "";
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox' && items[i].checked == true)
        selectedItems += items[i].value + ",";
    }
    selectedItems = selectedItems.substring(0, selectedItems.length - 1);
    if (selectedItems != ""){
      queryString += "&mime_types=" + selectedItems;
    }
    axios.get('https://api.thecatapi.com/v1/images/search?' + queryString)
      .then(res => {
        let cats = [];
        const itsAnArray = Array.isArray(res.data);
        if (itsAnArray) {
          cats = res.data;
        } else {
          cats.push(res.data);
        }
        this.setState({ cats })
      })
  }

  printChecked = () => {
    var items = document.getElementsByName('cbx');
    var selectedItems = "";
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox' && items[i].checked == true)
        selectedItems += items[i].value + ",";
    }
    selectedItems = selectedItems.substring(0, selectedItems.length - 1);
    let queryString = "limit=100&page=1&order=Desc"
    var e = document.getElementById("ddlCategory");
    queryString += e.options[e.selectedIndex].value;
    alert(queryString);
  }

  render() {
    return (
      <Layout>
        <b>Filters:</b>  Category &nbsp;
        <select id="ddlCategory">
          <option value="All">All</option>
          {this.state.categories.map((category, i) =>
            <option key={category.name} value={category.id}>{category.name}</option>)}
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="checkbox" name="cbx" value="gif" />gif &nbsp;&nbsp;&nbsp;
        <input type="checkbox" name="cbx" value="jpg" />jpg &nbsp;&nbsp;&nbsp;
        <input type="checkbox" name="cbx" value="png" />png &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="button" onClick={this.filterFn} value="Apply" />
        <div className="row align-items-center">
          {this.state.cats.map((cat, i) =>
            <div className="col gallery" key={cat.id}>
              <img src={cat.url}
                height={180}
                width={180}
                name="cat"
                id={cat.id}
                onClick={this.onChange.bind(this, cat.id)}
              />
              {/* Uncomment to display cat description
            <div className="desc" width={200}>{this.state.cats[i].breeds[0] !== undefined ? this.state.cats[i].breeds[0].description : 'Cat'}</div> */}
            </div>)}
        </div>
      </Layout>
    )
  }

}