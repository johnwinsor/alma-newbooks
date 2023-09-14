import Image from 'next/image'

async function getData() {
  const items = []
  const res = await fetch(
    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/acq/po-lines?q=item_library~MAIN&status=ALL&limit=5&offset=0&order_by=title&direction=desc&acquisition_method=ALL&expand=notes&min_expected_arrival_date=2022-03-06&max_expected_arrival_date=2023-04-06&apikey=l7xx2af7939c63424511946e0fcdc35fe22a',
    {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
    }
    
  )
  const data = await res.json()
  for (const line of data.po_line) {
    console.log(line.link+"?apikey=l7xx2af7939c63424511946e0fcdc35fe22a")
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
    console.log(item.resource_metadata.title)
    items.push(item)
  }
  return items
}

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-2 grid grid-cols-12 gap-2">
        {data.map(d => (
          <div 
            key={d.number}
            className="col-span-6 md:col-span-4 lg:col-span-3 aspect-video w-full bg-gray-100 relative"
            >
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-stone-950`}>
              {d.resource_metadata.title}
              </p>
            <Image 
              src={`https://covers.openlibrary.org/b/isbn/${d.resource_metadata.isbn}-M.jpg`}
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
              />
          </div>
        ))}
      </div>
    </main>
  )
}
