import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>Meet up at {props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
        title={props.meetupData.title}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_HOST);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); //return only id field
  //const meetups = await meetupCollection.find({}, {}).toArray(); //return everything
  client.close();

  return {
    //in false mode ,path not defined will goes to 404; if set to true or blocking, server will try generate
    //in blocking user will not see anything until it's all ready for render
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(process.env.DB_HOST);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  }); //return only id field
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
