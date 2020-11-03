import React, { useEffect, useState } from 'react';
import ResponsiveTable from '../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerStats, downloadPlayerStats } from '../redux/playerStats/actions';
import { Row, Col, Container, Button, InputGroup, InputGroupAddon, Input, ButtonGroup } from 'reactstrap';

const Home = () => {
  const dispatch = useDispatch();
  const playerStats = useSelector(state => state.playerStats.data.data);
  const playerStatsLoading = useSelector(state => state.playerStats.data.loading)
  const links = useSelector(state => state.playerStats.data.links);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = () => {
    dispatch(getPlayerStats(search));
  }

  const getRoute = (url) => {
    let splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 1]
  }

  const changeSortOrder = (order) => {
    let isAsc = order === 'asc';
    return isAsc ? 'desc' : 'asc';
  }

  const checkIfSorted = (sortBy) => {
    if (sortBy === '') {
      return ''
    } else {
      return changeSortOrder(order);
    }
  }

  useEffect(() => {
    dispatch(getPlayerStats());
  }, [dispatch])

  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-between my-2">
          <div>
            <InputGroup>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={() => handleSearch()}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Button color="primary" onClick={() => dispatch(downloadPlayerStats(true, sortBy, checkIfSorted(sortBy), search))}>Download</Button>
        </div>
      </Container>
      {!playerStatsLoading &&
        <Container fluid>
          <div className="mb-2">
            <Row>
              <Col>
                <ResponsiveTable
                  playerStats={playerStats}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  changeSortOrder={changeSortOrder}
                  />
              </Col>
            </Row>
          </div>
        </Container>
      }
      {typeof links !== "undefined" &&
        <Container fluid>
          <div className="d-flex justify-content-center my-2">
            <ButtonGroup>
              <Button onClick={() => dispatch(getPlayerStats(null, null, null, null, null, getRoute(links.first)))}>First</Button>
              {links.prev !== null &&
                <Button onClick={() => dispatch(getPlayerStats(null, null, null, null, null, getRoute(links.prev)))}>Previous</Button>
              }
              {links.next !== null &&
                <Button onClick={() => dispatch(getPlayerStats(null, null, null, null, null, getRoute(links.next)))}>Next</Button>
              }
              <Button onClick={() => dispatch(getPlayerStats(null, null, null, null, null, getRoute(links.last)))}>Last</Button>
            </ButtonGroup>
          </div>
        </Container>
      }
    </>
  )
}

export default Home;
