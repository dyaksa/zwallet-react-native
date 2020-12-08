import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import HistoryItem from "./HistoryItem";
import http from "../../../http-common";

class TransactionHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            token: props.token,
            page: 1,
            loading: true,
            loadingMore: false,
            error : null,
            refreshing: false
        }
    }

    componentDidMount(){
        this.fetchTransactions();
    }

    fetchTransactions = () => {
        http.get(`/transfer?page=${this.state.page}`,{headers: {"x-access-token" : this.state.token}})
        .then(results => {
            const data = results.data.data;
            this.setState((prevState,nextProps) => ({
                data : this.state.page === 1 ? Array.from(data) : [...this.state.data, ...data],
                loading: false,
                loadingMore: false,
                refreshing: false
            }));
        }).catch(err => {
            if(err){
                this.setState({error: err, loading: false});
            }
        })
    }

    renderItem = ({item}) => {
        return(
            <HistoryItem 
            receive_id={item.receive_id} 
            imagereceiver={item.receive_photo} 
            namereceiver={`${item.receive_firstname}.${item.receive_lastname.substr(0,1)}`} 
            imagesender={item.sender_photo} 
            namesender={`${item.sender_firstname}.${item.sender_lastname.substr(0,1)}`} 
            total={item.amount} 
            status={item.category}/>
        )
    }

    handleLoadMore = () => {
        this.setState(
            (prevState,nextProps) => ({
                page: prevState.page + 1,
                loadingMore: true
            }), () => {
                this.fetchTransactions()
            }
        )
    }

    renderFooter = () => {
        return (
            (this.state.loadingMore) ? 
            <View style={styles.loading_container}>
                <ActivityIndicator size="small"/>
            </View> : null
        )
    }

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.fetchTransactions()
        })
    }

    render(){
        return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    disableVirtualization={true}
                />
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        marginVertical: 10
    }
})

export default TransactionHistory;