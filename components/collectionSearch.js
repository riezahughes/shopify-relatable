import { Component } from "react";
import { TextField, Autocomplete } from "@shopify/polaris";

export default class CollectionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: "",
      searching: false,
      selectedOptions: ""
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
    const textField = (
      <Autocomplete.TextField
        label="Search for a collection"
        value={this.state.currentSearch}
        onChange={this.updateSearchResult}
        clearButton
        onClearButtonClick={this.clearSearch}
        placeholder="Type a Collection to Find..."
      />
    );

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
      let autoArray = [];
      let arrayFind = this.props.collections || [];

      for (var i = 0; i < arrayFind.length; i++) {
        console.log(i);
        autoArray.push({
          value: arrayFind[i].node.id,
          label: arrayFind[i].node.title
        });
      }
      return (
        <div>
          <Autocomplete
            options={autoArray}
            selected=""
            onSelect=""
            textField={textField}
          />
        </div>
      );
    }
  }
}
