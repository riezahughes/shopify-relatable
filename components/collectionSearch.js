import { Component } from "react";
import {
  Card,
  Layout,
  Page,
  Heading,
  TextField,
  TextContainer,
  List
} from "@shopify/polaris";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CHECK_SHOP = gql`
  query getProductQuery($id: ID!) {
    product(id: $id) {
      title
      onlineStoreUrl
      metafields(first: 50, namespace: "Test") {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`;

export default class CollectionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: "",
      searching: false
    };
    this.updateSearchResult = this.updateSearchResult.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.showSearchResult = this.showSearchResult.bind(this);
    this.timeout = 0;
  }

  showSearchResult() {
    this.setState({
      searching: true
    });
  }

  updateSearchResult(e) {
    this.setState({
      currentSearch: e
    });

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(this.showSearchResult, 600);
  }

  clearSearch() {
    this.setState({
      currentSearch: "",
      searching: false
    });
  }

  render() {
    let graphqlString = "gid://shopify/Product/" + this.props.product;
    if (this.state.searching == false || this.state.currentSearch == "") {
      return (
        <TextField
          label="Search for a collection"
          value={this.state.currentSearch}
          onChange={this.updateSearchResult}
          clearButton
          onClearButtonClick={this.clearSearch}
          placeholder="Type a Collection to Find..."
        />
      );
    } else {
      return (
        <Query query={CHECK_SHOP} variables={{ id: graphqlString }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;

            // if(data.product.metafields.edges.length > 0){
            //   console.log(data.product.metafields.edges)
            // }else{
            //   console.log("No Metafields")
            // }
            return (
              <div>
                <TextField
                  label="Search for a collection"
                  value={this.state.currentSearch}
                  onChange={this.updateSearchResult}
                  clearButton
                  onClearButtonClick={this.clearSearch}
                  placeholder="Type a Collection to Find..."
                />
                <TextContainer>
                  <List>
                    <List.Item>{data.product.title}</List.Item>
                    <List.Item>{data.product.title}</List.Item>
                  </List>
                </TextContainer>
              </div>
            );
          }}
        </Query>
      );
    }
  }
}
