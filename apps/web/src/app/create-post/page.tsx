import { PrimaryBtn } from "@repo/ui/primaryBtn";

export default function PostItem() {
  return (
    <div className="hero">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create post!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 transition-all hover:scale-105">
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
