import React from "react";
export default async function getData() {
    const items = []
    const res = await fetch(
      'https://api-na.hosted.exlibrisgroup.com/almaws/v1/acq/po-lines?q=item_library~MAIN&status=ALL&limit=15&offset=0&order_by=title&direction=desc&acquisition_method=ALL&expand=notes&min_expected_arrival_date=2022-03-06&max_expected_arrival_date=2023-04-06&apikey=l7xx2af7939c63424511946e0fcdc35fe22a',
      {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
      }
      
    )
    const data = await res.json()
    for (const line of data.po_line) {
      //console.log(line.link+"?apikey=l7xx2af7939c63424511946e0fcdc35fe22a")
      const response = await fetch(
        `${line.link}?apikey=l7xx2af7939c63424511946e0fcdc35fe22a`,
        {
          method: 'GET',
          headers: {
              'accept': 'application/json',
          },
        }
        )
      const item = await response.json();      
      const book = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + item.resource_metadata.isbn + '&key=AIzaSyC_ackqCcBlfzpHIjczLQoEjMyPoXTTj-Q&');
      const bookJson = await book.json();
      if (!bookJson.items[0].volumeInfo.hasOwnProperty('imageLinks')) {
        console.log('no images')
      } else {
        const images = bookJson.items[0].volumeInfo.imageLinks
        //console.log(images)
        const url = bookJson.items[0].volumeInfo.imageLinks.thumbnail
        //console.log(url)
        item.coverURL = url
        items.push(item)
      }
    }
    return items
}