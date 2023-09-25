import React from "react"
const parseString = require('xml2js').parseString;
require('@gouch/to-title-case')

export default async function getData() {
  const items = []  
  const res = await fetch(
    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/acq/po-lines?library=OLIN&status=ALL&limit=15&offset=0&order_by=title&direction=desc&acquisition_method=ALL&expand=notes&min_expected_arrival_date=2022-07-06&max_expected_arrival_date=2023-11-06&apikey=l7xx9075c8eb3ae54a53bdc0045eac4b3347',
    {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
    }
    
  )
  const data = await res.json()
  for (const line of data.po_line) {
    const response = await fetch(
      `${line.link}?apikey=l7xx9075c8eb3ae54a53bdc0045eac4b3347`,
      {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
      }
      )
    const item = await response.json();
    if (item.resource_metadata.hasOwnProperty('isbn')) {
      const openLibrary = 'https://covers.openlibrary.org/b/isbn/' +  item.resource_metadata.isbn + '-L.jpg'
      item.olCoverURL = openLibrary
      const title = item.resource_metadata.title
      const cleanTitle = title.replace(/\/$|\.$/, "");
      const lowerCase = cleanTitle.toLowerCase()
      const titleCase = lowerCase.toTitleCase()
      item.title = titleCase
      items.push(item)
      // const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + item.resource_metadata.isbn + '&key=AIzaSyC_ackqCcBlfzpHIjczLQoEjMyPoXTTj-Q&';
      // const book = await fetch(googleUrl);
      // const bookJson = await book.json();
      // if (!bookJson.items[0].volumeInfo.hasOwnProperty('imageLinks')) {
      //   console.log('no images')
      // } else {
      //   const images = bookJson.items[0].volumeInfo.imageLinks
      //   console.log(images)
      //   const url = bookJson.items[0].volumeInfo.imageLinks.thumbnail
      //   const zoom = url.replace("zoom=1", "zoom=0");
      //   console.log(zoom)
      //   item.coverURL = zoom
      //   items.push(item)
      // }
    } else {
      //console.log('no isbn' + JSON.stringify(item, null, 2))
    }
  }
  return items
}