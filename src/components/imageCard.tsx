import React from "react";
import { Card, CardBody, CardFooter, CustomInput } from "reactstrap";

const ImageCard = ({ data, addToDelete, removeToDelete }: any) => {
  return (
    <Card>
      <CardBody
        style={{
          backgroundImage: `url('${data.raw}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          height: "300px",
        }}
      >
        <div className="row">
          <div className="col-6">
            <CustomInput
              type="checkbox"
              id={data?.id}
              label=""
              onChange={(checked) => {
                if (checked.target.checked) {
                  addToDelete(data.album, data.name);
                } else {
                  removeToDelete(data.album, data.name);
                }
              }}
            />
          </div>
          <div className=" col-6">
            <p className="float-right"></p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="card-footer text-center">
        <p>{data.name}</p>
        <p>{data.album}</p>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
