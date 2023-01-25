import "./footer.css";

const footer = () => {
  return (
    <footer
    className="container"
      style={{
        backgroundColor: "#474647",
        color: "#fff",
        height: "auto",
        display: "flex",
        // zIndex:"3"
      }}
    >
      <div
        style={{
          marginLeft: "1% ",
          paddingTop: "2%",
          sticky: "bottom",
          display: "inline-block",
          paddingBottom: "2%",
          // zIndex: "2"
        }}
      >
        <h2>About Us</h2>
        <br />
        <p style={{ maxWidth: "80%" }}>
          A multidisciplinary research group performing basic and applied
          research in computer vision, data science, and related AI & machine
          learning areas.
        </p>
        <a
          target="_blank"
          style={{ color: "white" }}
          href="http://vision.seecs.edu.pk/"
        >
          <b>Machine Vision and Intelligent Systems Lab</b>
        </a>
      </div>
      <div
        style={{
          paddingLeft: "50% ",
          paddingTop: "2%",
          sticky: "bottom",
          display: "inline-block"
        }}
      >
        <h2>Sponsors</h2>
        <p style={{ maxWidth: "50%" }}>
          Asi@Connect provides dedicated high-capacity internet connectivity for
          research and education communities across Asia-Pacific; operating at
          speeds of up to 10 Gbps, it currently interconnects universities and
          research centres in 21 countries/economies across the region.
        </p>
        <a
          target="_blank"
          style={{ color: "white" }}
          href="https://www.tein.asia/"
        >
          <b>Asi@Connect</b>
        </a>
      </div>
    </footer>
  );
};

export default footer;
