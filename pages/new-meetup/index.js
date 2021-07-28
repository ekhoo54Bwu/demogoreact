import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
    const router = useRouter();

    const addMeetupHandler = async(enteredData) => {
        console.log(enteredData);
        const response = await fetch("/api/new-meetup", {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);
        router.push("/");
    };

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;