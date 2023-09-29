import React from "react"
const parseString = require('xml2js').parseString;
require('@gouch/to-title-case')

export default async function getXml() {
    const items = []
    // Set to true to filter items in processing (no permament call number)
    const filterInProceesing = false;
    
    function parseXml(xml) {
        return new Promise((resolve, reject) => {
            parseString(xml,{explicitArray : false}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
      }

    /////////////////////////////////  
      
    async function getData(isbn) {
        const openLibMetadata = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&format=json'
        const resp = await fetch(openLibMetadata)
        
        if (!resp.ok) {
            throw new Error('Failed to fetch data')
        }
        return resp.json()
    }
    
    /////////////////////////

    function getAuthor(element) {
        if (typeof element !== "undefined") {
            const aLowerCase = element.toLowerCase()
            const authorCase = aLowerCase.toTitleCase()
            const authorBy = "by " + authorCase
            const authorClean = authorBy.replace(/, Author.*\.|, [0-9]{4}.*\./g, "");
            return authorClean
        } else {
            console.log("NO AUTHOR")
            return ""
        }

    }

    ////////////////////////
    
    async function xmlParse(xml) {
    const result = await parseXml(xml);
    //console.log(result.report.QueryResult.ResultXml.rowset)
    const results = result.report.QueryResult.ResultXml.rowset.Row
    for (const r of results) {
        const item = {}
        
        const recDate = r.Column15
        
        const title = r.Column7
        const cleanTitle = title.replace(/\/$|\.$/, "");
        const lowerCase = cleanTitle.toLowerCase()
        const titleCase = lowerCase.toTitleCase()

        const authorValue = r.Column1
        const author = getAuthor(authorValue)

        const callno = r.Column10
        const callnoStatus = callno.replace(/Unknown/g, "In Processing");
        
        const isbns = r.Column2
        const isbn = isbns.replace(/;.*/, "");

        const data = await getData(isbn)
        const key = Object.keys(data)[0]
        try {
            if (data[key].hasOwnProperty('thumbnail_url')) {
                const openLibrary = 'https://covers.openlibrary.org/b/isbn/' + isbn + '-L.jpg'
                if (callnoStatus !== "In Processing") {
                    item.recDate = recDate
                    item.title = titleCase
                    item.author = author
                    item.callno = callnoStatus
                    item.olCoverURL = openLibrary
                
                    items.push(item)
                } else if (!filterInProceesing) {
                    item.recDate = recDate
                    item.title = titleCase
                    item.author = author
                    item.callno = callnoStatus
                    item.olCoverURL = openLibrary
                
                    items.push(item)
                } else {
                    console.log("In Processing")
                }
            }
        } catch(e) {
            e; // => ReferenceError
            console.log('no OpenLibrary JSON');
        }
    }
    //console.log(items)
    const length = items.length;
    console.log(length)
    return items;
    }

    const xmlres = await fetch(
    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports\?path\=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooks\&limit\=100\&col_names\=true\&apikey\=l8xx5852c9867ab64264901d17af13574837\&filter\=%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Acomparison%22%20op%3D%22between%22%0A%20%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Physical%20Item%20Details%22.%22Receiving%20%20%20Date%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-09-25%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-09-30%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E',
        {
        method: 'GET',
        headers: {
            'accept': 'application/xml',
        },
        }
    
    )
      
    const xml = await xmlres.text()
    const parsedResults = xmlParse(xml);
    return await parsedResults

}


 // GETTING ANALYTICS REPORT FILTER
    // This allows you to apply filters dynalically in the API call rather than in the Analytics criteria filters.
    // From Analytics Advanced Tab - Analysis XML
    // 4 Namespaces added
    // <sawx:expr xsi:type="sawx:comparison" op="between"
    //     xmlns:saw="com.siebel.analytics.web/report/v1.1" 
    //     xmlns:sawx="com.siebel.analytics.web/expression/v1.1" 
    //     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    //     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    //     >
    //     <sawx:expr xsi:type="sawx:sqlExpression">"Physical Item Details"."Receiving   Date"</sawx:expr>
    //     <sawx:expr xsi:type="xsd:date">2023-08-01</sawx:expr>
    //     <sawx:expr xsi:type="xsd:date">2023-09-30</sawx:expr>
    // </sawx:expr>

    // URL Encoded
    // %3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Acomparison%22%20op%3D%22between%22%0A%20%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Physical%20Item%20Details%22.%22Receiving%20%20%20Date%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-08-01%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-09-30%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E

    // Final API Call with date range filter:
    // https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports\?path\=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooks\&limit\=100\&col_names\=true\&apikey\=l8xx5852c9867ab64264901d17af13574837\&filter\=%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Acomparison%22%20op%3D%22between%22%0A%20%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Physical%20Item%20Details%22.%22Receiving%20%20%20Date%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-08-01%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Adate%22%3E2023-09-30%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E