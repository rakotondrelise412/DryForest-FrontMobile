import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#955138',
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#C36922',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },

  iconButton: {
    padding: 5,
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  userName: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },

  logo: {
    width: 80,
    height: 30,
  },

  mainContent: {
    flex: 1,
    marginTop: 60,
    marginBottom: 80,
  },

  mainContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  welcomeContainer: {
    alignItems: 'center',
    width: '100%',
  },

  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },

  welcomeSubtitle: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 5,
  },

  appName: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  overlayContainer: {
    position: 'relative',
    width: 250,
    height: 350,
    alignSelf: 'center',
  },

  treeImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: 350,
    opacity: 0.8,
  },

  suiviButton: {
    position: 'absolute',
    top: 120,
    left: 20,
    width: 210,
    height: 40,
    backgroundColor: '#C36922',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },

  creationButton: {
    position: 'absolute',
    top: 190,
    left: 20,
    width: 210,
    height: 40,
    backgroundColor: '#C36922',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#C36922',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },

  bottomMenuItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  bottomMenuText: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 2,
  },

});