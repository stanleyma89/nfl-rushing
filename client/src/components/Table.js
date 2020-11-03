import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getPlayerStats } from '../redux/playerStats/actions';

const ResponsiveTable = ({ playerStats, sortBy, setSortBy, order, setOrder, changeSortOrder }) => {
  const dispatch = useDispatch();

  const changeOrder = (field) => {
    let sameField = field === sortBy
    setOrder(changeSortOrder(order));
    if (!sameField) {
      setSortBy(field);
    }
    dispatch(getPlayerStats(null, field, order))
  }

    return (
      <Card>
        <CardBody>
          <Table className="mb-0" size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Team</th>
                <th>Pos</th>
                <th>Att/G</th>
                <th>Att</th>
                <th>
                  <Button onClick={() => changeOrder('total_rushing_yards')} className="alert-link">
                    Yds
                  </Button>
                </th>
                <th>Avg</th>
                <th>Yds/G</th>
                <th>
                  <Button onClick={() => changeOrder('total_rushing_touchdowns')} className="alert-link">
                    TD
                  </Button>
                </th>
                <th>
                  <Button onClick={() => changeOrder('longest_rush')} className="alert-link">
                    Lng
                  </Button>
                </th>
                <th>Lng TD</th>
                <th>1st</th>
                <th>1st%</th>
                <th>20+</th>
                <th>40+</th>
                <th>FUM</th>
              </tr>
            </thead>
              {typeof playerStats !== "undefined" && playerStats.length > 0 &&
                <tbody>
                  {playerStats.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.attributes['player-name']}</td>
                        <td>{item.attributes['player-team']}</td>
                        <td>{item.attributes['player-position']}</td>
                        <td>{item.attributes['rushing-attempts-per-game-avg']}</td>
                        <td>{item.attributes['rushing-attempts']}</td>
                        <td>{item.attributes['total-rushing-yards']}</td>
                        <td>{item.attributes['rushing-average-yards-per-attempt']}</td>
                        <td>{item.attributes['rushing-yards-per-game']}</td>
                        <td>{item.attributes['total-rushing-touchdowns']}</td>
                        <td>{item.attributes['longest-rush']}</td>
                        <td>{item.attributes['longest-rush-with-touchdown'].toString()}</td>
                        <td>{item.attributes['rushing-first-downs']}</td>
                        <td>{item.attributes['rushing-first-down-percentage']}</td>
                        <td>{item.attributes['rushing-twenty-plus-yards']}</td>
                        <td>{item.attributes['rushing-forty-plus-yards']}</td>
                        <td>{item.attributes['rushing-fumbles']}</td>
                      </tr>
                    );
                  })}
                </tbody>
              }
          </Table>
        </CardBody>
      </Card>
    );
};

export default ResponsiveTable;
