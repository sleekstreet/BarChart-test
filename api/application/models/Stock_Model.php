<?
class Stock_Model extends CI_Model{
	
	private function userQuery(){
		$query="SELECT symbol from quotes";
		$output = $this->db->query($query);
		$queryOutput = "SELECT ";$c=0;
		foreach($output->result() as $k => $v){
			if($c===count($output->result())-1){$queryOutput .= " `".$v->symbol."` ";}
			else{$queryOutput .= " `".$v->symbol."`, ";}
			$c++;
		}
		$queryOutput .="from users where ";
		return $queryOutput;
	}
	
	function login($usr, $pass){
		$query = $this->userQuery();
		$query.=" `password`='".$pass."' AND `username`='".$usr."'";
		$output = $this->db->query($this->query);

		if($output->result() === null){return null;}
		else{ $result['hash'] = password_hash($pass, PASSWORD_DEFAULT);
			$Update = $this->db->query("update `users` set `users`.`crypt`='".$result['hash']."' where `users`.`username` = '".$usr."'");
			$result['output'] = $output->result();
			return $result;
		}
	}

	function updateUser($hash, $sym, $method){
		$UpdateQuery="";
		$query = $this->userQuery();
		$query.= "`crypt`='".$hash."'";
		if($sym===0 && $method ===0){
			$output = $this->db->query($query);
			
			return $output->result();
		}else{
			if($sym!==0 && $method === "add"){
				$i=0;
				if(preg_match("/,/", $sym)){
					$symTrimed= trim($sym);
					$symArr = explode(",", $symTrimed);

					foreach($symArr as $value){
						if($i<0){$UpdateQuery.="`users`.`".$value."`=1";$i++;}
						else{$UpdateQuery.="and `users`.`".$value."`=1";}
					}
				}else{$UpdateQuery.="`users`.`".$sym."`=1";}
			}
			else{$UpdateQuery.="`users`.`".$sym."`=0";}
			
			$Update = $this->db->query("update `users` set ".$UpdateQuery." where `users`.`crypt` = '".$hash."'");
			$output=$this->db->query($query);
			return $output->result();
		}		
		
		
	}
	function viewQuotes($stocksArr){
		$query = "SELECT * FROM quotes where ";
		$i=0;$c=0;
		foreach($stocksArr as $key => $value){
			if($c<1){if($value==="1"){$query.=" `symbol`='".$key."' ";$c++;}else{$i++;}}
			else{if($value==="1"){$query.="OR `symbol`='".$key."' ";}else{$i++;}}
			
		}
		if($i===20){
			return("There are no symbols on you watchlist. Please add one ".$query);}
		else{$output = $this->db->query($query);
			return $output->result();
		}
	}
}
?>