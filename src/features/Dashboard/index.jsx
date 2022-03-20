import React from "react";
import "./styles.css"
function Dashboard(props) {
  return (
    <>
      <div className="overview pt-5 pb-5">
        <div className="container">
          <div className="section-overview">
            <div className="title-overview d-flex">
              <h3>Tổng Quan</h3>
              <div className="btn-overview mx-auto">
                <button className="btn-report">
                  <a href="https://tluhrm.tk" className="link-report">
                    Báo Cáo
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="section-2 pt-2">
            <div className="row">
              <div className="sec2-item">
                <span>Tổng số giảng viên</span>
                <div className="row pt-3">
                  <div className="col-md-6">
                    <span>
                      <i className="fa-solid fa-user-group"></i>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <i>----</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="sec2-item">
                <span>Giảng viên mới</span>
                <div className="row pt-3">
                  <div className="col-md-6">
                    <span>
                      <i className="fa-solid fa-user-group"></i>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <i>----</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="sec2-item">
                <span>Thử việc thành công</span>
                <div className="row pt-3">
                  <div className="col-md-6">
                    <span>
                      <i className="fa-solid fa-user-group"></i>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <i>----</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="sec2-item">
                <span>Nghỉ dạy</span>
                <div className="row pt-3">
                  <div className="col-md-6">
                    <span>
                      <i className="fa-solid fa-user-group"></i>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <i>----</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-3 pt-3">
            <div className="list-chart">
              <div className="row">
                <div className="col-md-6">
                  <div className="item-chart">
                    <h6>
                      <strong>Biến động nhân sự</strong>
                    </h6>
                    <span>Đại Học Thủy Lợi - 2018</span>
                    <div className="chart">

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item-chart">
                    <h6>
                      <strong>Số lượng nhân sự</strong>
                    </h6>
                    <span>Đại Học Thủy Lợi - 2018</span>
                    <div className="chart">

                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="item-chart">
                    <h6>
                      <strong>Cơ cấu nhân sự theo phòng ban</strong>
                    </h6>
                    <span>Đại Học Thủy Lợi - 2018</span>
                    <div className="chart">

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item-chart">
                    <h6>
                      <strong>Thống kê hợp đồng theo loại hợp đồng</strong>
                    </h6>
                    <span>Đại Học Thủy Lợi - 2018</span>
                    <div className="chart">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
