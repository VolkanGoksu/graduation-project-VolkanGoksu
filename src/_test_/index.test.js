import Index from '../index'

test('renders without crashing', () => {
  expect(JSON.stringify(Index)).toMatchSnapshot();
});