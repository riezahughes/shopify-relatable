import { Component } from "react";
import { Card, Layout, Page, Heading, TextField } from "@shopify/polaris";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CHECK_SHOP = gql`
  query getProductQuery($id: ID!){
    product(id: $id) {
      title
      onlineStoreUrl
      metafields(first: 50, namespace:"Test"){
        edges{
        node{
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

        <Query query={CHECK_SHOP} variables={{id: graphqlString}}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
              
            if(data.product.metafields.edges.length > 0){
              console.log(data.product.metafields.edges)
            }else{
              console.log("No Metafields")
            }

            let title = data.product.title + " - Related Products";
            
            return(
              <Page>
                <Card title={title}>
                </Card>
                <Card title="Collections Whitelist" sectioned>
                  <TextField
                    label="Search for a collection"
                    value="Here's the value"
                    onChange=""
                    clearButton
                    onClearButtonClick=""
                  />
                  {data.product.metafields.edges.map( metafield => {
                    return <p>found</p>
                  })}
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
            )
          }}
        </Query>
    );
  }
}
