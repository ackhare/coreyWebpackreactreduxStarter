import React, { Component } from "react";

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
            {/* upload does not works on Heraku so I have used static image */}
              {/* <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              /> */}
                                          <img
                className="avatar border-gray"
                src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/37929654_1083155691847732_8115744797790044160_n.jpg?_nc_cat=100&_nc_oc=AQkI21dPpETn4ZUaDXjN9jebZEhSRaW-Exay2OXf-H9ZIDGApzhAdQiRWYAoxUXXvNA&_nc_ht=scontent-ort2-1.xx&oh=403cf2a510ec65da5202a00ecdf28264&oe=5D94DDF7"
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
                <br />
                <small>{this.props.company}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
