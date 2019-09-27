import Layout from '../components/Layout';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = "3983ff28-e580-4b8b-9ad6-2a69d855afa8";

class FavList extends React.Component {
  state = {
    favs: [],
    itsAnArray: false
  }

  componentDidMount() {
    axios.get('https://api.thecatapi.com/v1/favourites?sub_id=memh0x&order=Desc')
      .then(res => {
        let favs = [];
        const itsAnArray = Array.isArray(res.data);
        if (itsAnArray) {
          favs = res.data;
        } else {
          favs.push(res.data);
        }
        this.setState({ favs })
      })
  }

  onChange(fav) {
    axios.delete('https://api.thecatapi.com/v1/favourites/' + fav)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("You deleted a favorite cat!");
        this.componentDidMount();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd);
          alert("An error occured.");
        }
      });
  };

  render() {
    return (
      <Layout>
        <h1 className="text-center">Behold!!! Your favorite cats!</h1>
        <div className="row align-items-center">
          {this.state.favs.map((fav, i) =>
            <div className="col gallery" key={fav.id}>
              <img src={fav.image.url}
                height={180}
                width={180}
                name="fav"
                id={fav.id}
                onClick={this.onChange.bind(this, fav.id)}
              />
              {/* Uncomment to display cat description
            <div className="desc" width={200}>{this.state.cats[i].breeds[0] !== undefined ? this.state.cats[i].breeds[0].description : 'Cat'}</div> */}
            </div>)}
        </div>
      </Layout>
    )
  }

}

export default FavList;