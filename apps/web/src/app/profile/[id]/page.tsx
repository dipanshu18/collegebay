import { PrimaryBtn } from "@repo/ui/primaryBtn";

export default function UpdateUserProfile() {
  return (
    <div className="hero py-12">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Edit Personal Details!</h1>
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
                placeholder="your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <PrimaryBtn text="Update" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
