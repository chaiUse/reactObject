import { useState } from "react";
import { Table } from "antd";
import { useEffect } from "react";

function table(props) {
  console.log(props.list, props.max);

  useEffect(() => {}, []);
  return (
    <div>
      <Table
        dataSource={props.list}
        columns={props.nlist}
        bordered
        loading={props.loding}
      />
      ;
    </div>
  );
}

export default table;
