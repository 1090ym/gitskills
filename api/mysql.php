<?php



class Forum{

    private $_db;

    public function __construct(PDO $_db)
    {
        $this->_db = $_db;
    }

    public function mysql($sql)
    {
        
        $stmt = $this->_db->prepare($sql);
        
        if(!($stmt->execute())){
            throw new Exception("执行失败");
        }
        
        $re = $stmt->fetch(PDO::FETCH_ASSOC);
        //header('Content-Type:application/json');//加上这行,前端那边就不需要var result = $.parseJSON(data);
        return $re;
    }

}