import Image from "next/image";
import requestImage from "../../../../../../public/requestImage.jpg";
import { PrimaryBtn } from "@repo/ui/primaryBtn";
import { SecondaryBtn } from "@repo/ui/secondaryBtn";

export default function UserRequestDetailsCheck() {
  return (
    <div className="hero max-w-2xl mx-auto">
      <div className="hero-content flex-col">
        <Image src={requestImage} alt="Request Product Image" />
        <div>
          <h1 className="text-3xl font-bold">Request product name</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex gap-5">
            <PrimaryBtn text="Approve" />
            <SecondaryBtn text="Reject" />
          </div>
        </div>
      </div>
    </div>
  );
}
