import React from 'react'
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath'
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

const CustomerWalletModal = () => {
  return (
    <div className="modal fade custom-modal" id="add-wallet">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Add Wallet</h5>
              <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><Icon.X className="react-feather-custom"/></button>
            </div>
            <div className="modal-body pt-0">
              <form action="#">
                <div className="wallet-add">
                  <div className="form-group">
                    <label className="col-form-label pt-0">Amount</label>
                    <input type="text" className="form-control" placeholder="Enter Amount" />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="bank-selection">
                        <input type="radio" defaultValue="attach_link" id="rolelink" name="attachment" defaultChecked />
                        <label htmlFor="rolelink">
                          <ImageWithBasePath src="assets/img/paypal.png" alt="Paypal" />
                          <span className="role-check"><i className="fa-solid fa-circle-check" /></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bank-selection">
                        <input type="radio" defaultValue="attach_link" id="rolelink1" name="attachment" />
                        <label htmlFor="rolelink1">
                          <ImageWithBasePath src="assets/img/stripe.png" alt="Stripe" />
                          <span className="role-check"><i className="fa-solid fa-circle-check" /></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bank-selection">
                        <input type="radio" defaultValue="attach_link" id="rolelink2" name="attachment" />
                        <label htmlFor="rolelink2">
                          <ImageWithBasePath src="assets/img/bank.png" alt="image" />
                          <span className="role-check"><i className="fa-solid fa-circle-check" /></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="modal-submit text-end">
                    <Link to="#" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CustomerWalletModal