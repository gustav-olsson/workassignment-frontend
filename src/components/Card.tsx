import {Card, Carousel, Tab, Table, Tabs} from "react-bootstrap";
import React, {useState, useRef, useEffect} from "react";
import { connect, ConnectedProps } from "react-redux";
import '../App.css';
import {getSelectedChargerSelector, getShowChargerModelSelector} from "../store/charger/selectors";
import {setShowChargerModal} from "../store/charger/actions";
import {IConnection} from "../store/charger/action.types";

const mapStateToProps = (state:any) => {
    return {
        showChargerModal: getShowChargerModelSelector(state),
        selectedCharger: getSelectedChargerSelector(state),
    };
};
const mapDispatchToProps = {
    setShowChargerModal: setShowChargerModal
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const InfoCard = ({showChargerModal, setShowChargerModal, selectedCharger}:PropsFromRedux) => {
    const ref = useRef<any>(null);
    useEffect(() => {
        let handleClickOutside = (event:MouseEvent) => {
            if (ref?.current) {
                if (!ref?.current?.contains(event.target)) {
                    let element = event.target as HTMLElement;
                    let showModal: boolean = element.tagName?.toLowerCase() === 'path';
                    setShowChargerModal(showModal);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return showChargerModal ? (
        <Card ref={ref} className="info-card">
            <Carousel fade>
                {selectedCharger?.mediaItems?.map(media => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={media?.mediaUrl}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Card.Header>{selectedCharger?.addressInfo?.title}</Card.Header>
            <Card.Body className={"charger-info"}>
                <Tabs defaultActiveKey="position">
                    <Tab eventKey="position" title="Position">
                        <Card.Text className={"charger-address"}>
                            <b>Address:</b> {selectedCharger?.addressInfo?.streetName}
                            <b>Postcode:</b> {selectedCharger?.addressInfo?.postcode}
                            <b>Town:</b> {selectedCharger?.addressInfo?.town}
                        </Card.Text>
                    </Tab>
                    <Tab eventKey="connection" title="Laddnings kontakter">
                        <Table striped bordered hover size="sm" className={"charger-connections"}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Amps</th>
                                    <th>PowerKw</th>
                                    <th>Voltage</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCharger?.connections?.map((connection:IConnection, id) => (
                                    <tr>
                                        <td>{id}</td>
                                        <td>{connection?.amps}A</td>
                                        <td>{connection?.powerKw}kW</td>
                                        <td>{connection?.voltage}V</td>
                                        <td>{connection?.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    ) : null
}

export default connector(InfoCard);
