import { PrimaryBtn } from "@repo/ui/primaryBtn";

export default function PostItem() {
  return (
    <div className="hero py-12">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create post!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 transition-all hover:scale-105">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="item name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="item description(features, condition, ...)"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="item price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Images upload</span>
              </label>
              <input
                type="file"
                multiple={true}
                className="file-input file-input-bordered w-full"
              />
              <small className="text-rose-700">
                <strong>NOTE:</strong> You won't be able to update images after
                creating post
              </small>
            </div>
            <div className="form-control mt-6">
              <PrimaryBtn text="Post" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
