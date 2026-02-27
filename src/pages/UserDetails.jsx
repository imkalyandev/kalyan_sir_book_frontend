import { useParams } from "react-router-dom";

function UserDetails() {

  const { id } = useParams();


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold text-purple-600">

        User Details

      </h1>


      <p className="mt-4 text-xl">

        User ID: {id}

      </p>

    </div>

  );

}

export default UserDetails;