import { Component } from "react";
import {
  Card,
  Layout,
  Page,
  Heading,
  TextField,
  TextContainer
} from "@shopify/polaris";
import { Query } from "react-apollo";
import CollectionSearch from "../components/collectionSearch";
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

export default class Product extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let graphqlString = "gid://shopify/Product/" + this.props.query.id;
    return (
      <Query query={CHECK_SHOP} variables={{ id: graphqlString }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          let title = 'Related Products for "' + data.product.title + '"';
          return (
            <Page>
              <Heading>{title}</Heading>
              <br />
              <Card title="Collections Whitelist" sectioned>
                <CollectionSearch product={this.props.query.id} />
              </Card>
              <Card title="Product Selection" sectioned>
                <TextField
                  label="Search for a collection"
                  value="Here's the value"
                  onChange=""
                  clearButton
                  onClearButtonClick=""
                />
                <ul>
                  <li>
                    one item <button>Delete</button>
                  </li>
                  <li>
                    two item <button>Delete</button>
                  </li>
                  <li>
                    three item <button>Delete</button>
                  </li>
                </ul>
              </Card>
            </Page>
          );
        }}
      </Query>
    );
  }
}
