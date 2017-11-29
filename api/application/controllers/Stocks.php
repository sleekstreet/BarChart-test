<?php defined('BASEPATH') OR exit('No direct script access allowed');

require('application/libraries/REST_Controller.php');

class Stocks extends REST_Controller {

	public function __construct()
        {
                parent::__construct();
                $this->load->model('stock_Model');
        }

	public function login_post(){
		$user = $this->post('username');
		$pass = $this->post('password');
		if($user===null ||$pass===null){$this->response("NULL");}
		else{$result = $this->stock_Model->login($user, $pass);
			if($result!=null){
				$data['stCokiName'] = "StUsr"; 
				$data['stCokiVal'] = $result['hash'];
				$data['stocks'] = $this->stock_Model->viewQuotes($result['output'][0]);
				//print_r($data);
				$this->response(json_encode($data));
			}
			else{$this->response($result);}
		}
		
	}

	public function add_post(){
		$inputSym = $this->post('stockSymbol');
		$hash = $this->post('hash');
		$check = $this->stock_Model->updateUser($hash, 0,0);
		$checkArr = (array) $check[0];
		if($checkArr[(string) strtoupper($inputSym)]==="1"){$this->response("not added");}
		else{$result = $this->stock_Model->updateUser($hash, $inputSym, "add");
			$output = $this->stock_Model->viewQuotes($result[0]);
			$this->response(json_encode($output));
		}

		
	}
	public function delete_post(){
		$inputSym = $this->post('stockSymbol');
		$hash = $this->post('hash');
		$result = $this->stock_Model->updateUser($hash, $inputSym, "del");
		$output = $this->stock_Model->viewQuotes($result[0]);

		$this->response(json_encode($output));
	}

	public function QuoteView_post(){
		$usrInfo = $this->post('CookieVal');
		$result = $this->stock_Model->updateUser($usrInfo, 0,0);
		$output = $this->stock_Model->viewQuotes($result[0]);

		$this->response(json_encode($output));
	}
}
