import Head from 'next/head';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "some meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",
//     address: "lalala asas",
//     description: "hahaha",
//   },
//   {
//     id: "m2",
//     title: "some meetup 2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kuala_Lumpur_City_Centre.jpg/800px-Kuala_Lumpur_City_Centre.jpg",
//     address: "KLCC",
//     description: "asasaasa",
//   },
//   {
//     id: "m3",
//     title: "some meetup 3",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",
//     address: "dunno la",
//     description: "cincai",
//   },
// ];

const HomePage = (props) => {
  return(
  <> 
  <Head>
      <title>React Course</title>
      <meta name="description" content="learning react index page"></meta>
  </Head>
  <MeetupList meetups={props.meetups} />
  </>);
};

//this will always run server side
// export async function getServerSideProps(context) {
//     //something from nodejs
//     const req = context.req;
//     const res = context.res;

//     return {
//       props: { meetups: DUMMY_MEETUPS }
//     };
// }

export async function getStaticProps() {
  //instead of fetching from internal API we can also just call it directly from getStaticProps or getServerSideProps
  //these codes are run in server side, so it is safe

  const client = await MongoClient.connect(
    "mongodb+srv://ekdemoM4ster:wGKChip6aYZaDaoj@cluster0.bj3w0.mongodb.net/ekdemo?authSource=admin&replicaSet=atlas-lry272-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //frequency in SECONDS for server to re-fetch data to hydrate/generate page
  };
}

export default HomePage;
