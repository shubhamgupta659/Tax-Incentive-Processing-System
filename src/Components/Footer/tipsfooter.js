import { LinkOutlined } from '@ant-design/icons';

function TIPSFooter() {
  return (
    <div className="appFooter">
      <div className="footer__content">
        <div className="footer__top-section">
          <p className="footer__title"><h2>Tax Incentive Processing System</h2></p>
          <div className="footer__links">
            <p>Contact us at 
              <a href="mailto:helpdesk@mas.gov.sg" class="footer__link"><span>&nbsp;</span>helpdesk@mas.gov.sg</a>
            </p>
          </div>
        </div>
        <div className="footer__bottom-section">
          <div className="footer__links">
            <a className="footer__link" href="https://www.mas.gov.sg/privacy-statement" target="_blank" rel="noreferrer">Privacy Statement
            <LinkOutlined />
            </a>
            <a className="footer__link" href="https://www.mas.gov.sg/terms-of-use" target="_blank" rel="noreferrer">Terms of Use
            <LinkOutlined />
            </a>
            <a className="footer__link" href="https://www.mas.gov.sg/rate-this-website" target="_blank" rel="noreferrer">Rate this Website
            <LinkOutlined />
            </a>
            <a className="footer__link" href="https://www.reach.gov.sg/" target="_blank" rel="noreferrer">Reach
            <LinkOutlined />
            </a>
          </div>
          <div className="footer__watermark">
            <p>© 2023 Government of Singapore</p>
            <p>Last Updated 11 Jan 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TIPSFooter;