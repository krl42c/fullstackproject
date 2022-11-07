package com.usersbackend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.usersbackend.user.User;
import com.usersbackend.user.UserType;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = UsersbackendApplication.class)
@WebAppConfiguration
class UsersbackendApplicationTests {
	protected MockMvc mockMvc;
	@Autowired  WebApplicationContext webApplicationContext;

	@Test
	void contextLoads() {
		setUp();
	}

	protected void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	protected String mapToJson(Object obj) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(obj);
	}
	protected <T> T mapFromJson(String json, Class<T> clazz)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, clazz);
	}

	@Test
	public void getUsers() throws Exception {
		setUp();
		String uri = "/api/users";
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void createUser() throws Exception {
		setUp();
		String uri = "/api/users";
		User testUser = new User(1, "TestUser", "TestUser", "test@test", new UserType(1, "Admin"));
		String input = mapToJson(testUser);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(input)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void deleteUser() throws Exception {
		setUp();
		String uri = "/api/users";
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(uri).param("id","4")).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200,status);
	}

	@Test
	public void editUser() throws Exception {
		setUp();
		String uri = "/api/users";
		User testUser = new User(1, "TestUser", "TestUser2", "test@test", new UserType(1, "Admin"));
		String input = mapToJson(testUser);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(input)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void getUserTypes() throws Exception {
		setUp();
		String uri = "/api/user_types";
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void createUserType() throws Exception {
		setUp();
		String uri = "/api/user_types";
		UserType userType = new UserType(3,"TestType");
		String input = mapToJson(userType);
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(input)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void deleteUserType() throws Exception {
		setUp();
		String uri = "/api/user_types";
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(uri).param("id","1")).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200,status);
	}

	@Test
	public void editUserType() throws Exception {
		setUp();
		String uri = "/api/user_types";
		UserType userType = new UserType(1,"TestEdit");
		String input = mapToJson(userType);
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(input)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
	}
}
