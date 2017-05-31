import React, { PropTypes, Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import * as globalStyles from '../ styles/ global';

export default class NewsFeed extends Component {

  constructor(props) {
    super(props);
    /* rowHasChanged is a func that informs on how to compare rows upon change */
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.news)
    };
  }

  // Method that tells ListView how to render each row.
  renderRow(rowData, ...rest) {
    const index = parseInt(rest[1], 10);
    return (
      <NewsItem
        style={styles.newsItems}
        index={index}
        {...rowData}
      />
    );
  }

  render() {
    /*renderHeader, renderFooter, renderSeparator can be used with ListView as props*/
    /*Each of these functions should return a renderable React element.*/
    return (
      <View style ={ globalStyles.COMMON_STYLES.pageContainer}>
      {/* enableEmptySections says to render empty list sections*/}
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={this.props.listStyles}
        />
      </View>
    );
  }
}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  listStyles: View.propTypes.style
};

// Creating Mock Data with default props.
NewsFeed.defaultProps = {
   news: [
     {
       title: 'React Native',
        imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
        description: 'Build Native Mobile Apps using JavaScript and React',
        date: new Date(),
        author: 'Facebook',
        location: 'Menlo Park, California',
        url: 'https:// facebook.github.io/ react-native'
    },
    {
      title: 'Packt Publishing',
      imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
      description: 'Stay Relevant',
      date: new Date(),
      author: 'Packt Publishing',
      location: 'Birmingham, UK',
      url: 'https:// www.packtpub.com/'
    }
  ]
};

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20
  }
});
