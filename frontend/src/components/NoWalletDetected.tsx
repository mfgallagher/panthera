
export default function NoWalletDetected() {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>
            . <br />
            If you already have MetaMask installed, please log in by clicking on the icon in the top right of your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
