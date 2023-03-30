import Mock from "mockjs"
import j_set_filter from "./responces/set_filter.json"
import j_set_interface from "./responces/set_interface.json"
import j_start_sniffer from "./responces/start_sniffer.json"
import j_test_sniffer from "./responces/test_sniffer.json"
import j_update from "./responces/update.json"
import j_sessions from "./responces/sessions.json"


const debugSetFilter = Mock.mock("http://localhost:5000/mock/set_filter", "get", {
    status: 200,
    data: j_set_filter
})
const debugSetInterface = Mock.mock("http://localhost:5000/mock/set_interface", "get", {
    status: 200,
    data: j_set_interface
})
const debugStartSniffer = Mock.mock("http://localhost:5000/mock/start_sniffer", "get", {
    status: 200,
    data: j_start_sniffer
})
const debugTestSniffer = Mock.mock("http://localhost:5000/mock/test_sniffer", "get", {
    status: 200,
    data: j_test_sniffer
})
const debugUpdate = Mock.mock("http://localhost:5000/mock/update", "get", {
    status: 200,
    data: j_update
})
const debugSessions = Mock.mock("http://localhost:5000/mock/sessions", "get", {
    status: 200,
    data: j_sessions
})

export default {
    debugSetFilter,
    debugSessions,
    debugUpdate,
    debugStartSniffer,
    debugTestSniffer,
    debugSetInterface
}