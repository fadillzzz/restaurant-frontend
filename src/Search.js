import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {Row, Col, Form, Button, Input} from 'reactstrap';
import {search} from './actions/Search';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: null,
            searchDisabled: false
        };
    }

    updateFilter = date => {
        this.setState({dateTime: date});
    }

    search = async e => {
        e.preventDefault();
        this.setState({searchDisabled: true});

        let dateTime = this.state.dateTime;

        if (dateTime) {
            dateTime = moment(dateTime).format('ddd H:mm A');
        } else {
            dateTime = '';
        }

        await this.props.search(dateTime);

        this.setState({searchDisabled: false});
    }

    render() {
        const {restaurants} = this.props.data;

        return (
            <div>
                <Form onSubmit={this.search}>
                    <h1>Search Restaurants</h1>
                    <Row>
                        <Col md="9">
                            <DatePicker
                                selected={this.state.dateTime}
                                onChange={this.updateFilter}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Time"
                                placeholderText="Select a date and time to filter restaurants"
                                customInput={<Input />}
                            />
                        </Col>
                        <Col md="3">
                            <Button disabled={this.state.searchDisabled}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <div style={{display: restaurants.length === 0 ? 'none' : 'block', paddingTop: '20px'}}>
                    {restaurants.map((restaurant, index) => (
                        <Row key={index}>
                            <Col>
                                <Button className="add-to-collection" color="success">
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                    <span className="name">{restaurant.name}</span>
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({data: state.search});
const mapDispatchToProps = dispatch => ({
    search: dateTime => dispatch(search(dateTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);